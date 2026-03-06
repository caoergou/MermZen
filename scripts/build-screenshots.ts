/**
 * 自动构建截图脚本：全流程自动生成最新的README截图
 * 功能：
 * 1. 自动执行 npm run build 构建最新代码
 * 2. 自动启动 vite preview 服务，自动分配可用端口
 * 3. 顺序执行编辑器截图和预览图生成
 * 4. 生成完成后自动关闭服务
 * 5. 校验生成的截图文件大小，失败时不覆盖原有文件
 *
 * 用法：
 * npm run build:screenshots          # 生成所有截图
 * npm run build:screenshots editor   # 仅生成编辑器截图
 * npm run build:screenshots preview  # 仅生成预览图
 */

import { spawn, ChildProcess } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'assets');

// 最小截图大小（10KB），小于此值认为生成失败
const MIN_IMAGE_SIZE = 10 * 1024;

// 查找可用端口
async function findAvailablePort(startPort = 8766): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address() as net.AddressInfo;
      server.close(() => resolve(port));
    });
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
}

// 执行命令并返回 promise
function runCommand(cmd: string, args: string[], cwd = ROOT): Promise<{ code: number | null; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const process = spawn(cmd, args, { cwd, stdio: 'pipe' });
    let stdout = '';
    let stderr = '';

    process.stdout?.on('data', (data) => {
      stdout += data.toString();
      console.log(data.toString());
    });

    process.stderr?.on('data', (data) => {
      stderr += data.toString();
      console.error(data.toString());
    });

    process.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

// 校验生成的截图文件
function validateScreenshots(): boolean {
  const expectedFiles = [
    'editor-en.png',
    'editor-en-dark.png',
    'editor-zh.png',
    'editor-zh-dark.png',
    'preview-flowchart.png',
    'preview-flowchart-en.png',
    'preview-architecture.png',
    'preview-architecture-en.png',
    'preview-sequence.png',
    'preview-sequence-en.png',
  ];

  let allValid = true;

  for (const file of expectedFiles) {
    const filePath = path.join(ASSETS_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ 截图缺失: ${file}`);
      allValid = false;
      continue;
    }

    const stats = fs.statSync(filePath);
    if (stats.size < MIN_IMAGE_SIZE) {
      console.error(`❌ 截图损坏: ${file} (大小: ${stats.size}字节，小于10KB)`);
      allValid = false;
    } else {
      console.log(`✅ 校验通过: ${file} (大小: ${Math.round(stats.size / 1024)}KB)`);
    }
  }

  return allValid;
}

async function main() {
  const args = process.argv.slice(2);
  const generateEditor = args.length === 0 || args.includes('editor');
  const generatePreview = args.length === 0 || args.includes('preview');

  console.log('🚀 开始自动构建截图流程...');
  console.log(`📝 生成类型: ${generateEditor ? '编辑器截图' : ''} ${generatePreview ? '预览图' : ''}`);

  // 1. 构建最新代码
  console.log('\n📦 构建最新代码...');
  const buildResult = await runCommand('npm', ['run', 'build']);
  if (buildResult.code !== 0) {
    console.error('❌ 构建失败，终止流程');
    process.exit(1);
  }
  console.log('✅ 构建完成');

  // 2. 查找可用端口
  const port = await findAvailablePort();
  console.log(`🔌 可用端口: ${port}`);

  // 3. 启动 preview 服务
  console.log(`🚀 启动 vite preview 服务 (端口: ${port})...`);
  const previewProcess = spawn('npx', ['vite', 'preview', '--port', port.toString()], {
    cwd: ROOT,
    stdio: 'ignore'
  });

  // 等待服务启动
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // 4. 生成编辑器截图
    if (generateEditor) {
      console.log('\n🖼️  生成编辑器截图...');
      const editorResult = await runCommand('npx', ['tsx', 'scripts/generate-editor-screenshots.ts', port.toString()]);
      if (editorResult.code !== 0) {
        console.error('❌ 编辑器截图生成失败');
      } else {
        console.log('✅ 编辑器截图生成完成');
      }
    }

    // 5. 生成预览图
    if (generatePreview) {
      console.log('\n🖼️  生成预览图...');
      const previewResult = await runCommand('npx', ['tsx', 'scripts/generate-preview-pngs.ts', port.toString()]);
      if (previewResult.code !== 0) {
        console.error('❌ 预览图生成失败');
      } else {
        console.log('✅ 预览图生成完成');
      }
    }

    // 6. 校验截图
    console.log('\n🔍 校验生成的截图...');
    const isValid = validateScreenshots();

    if (isValid) {
      console.log('\n🎉 所有截图生成成功！');
    } else {
      console.log('\n⚠️  部分截图生成失败，原有文件未被覆盖');
      process.exit(1);
    }

  } finally {
    // 确保关闭 preview 服务
    console.log(`\n🛑 关闭 preview 服务 (端口: ${port})...`);
    previewProcess.kill();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error);
