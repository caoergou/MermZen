#!/usr/bin/env node
/**
 * 验证 blog 文章中 URL hash 是否为正确的 pako deflate + base64 编码
 * 解码步骤与 modules/export.js decodeCode() 一致
 */

const zlib = require('zlib');

function decodeCode(encoded) {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4 !== 0) encoded += '=';
  const binary = Buffer.from(encoded, 'base64');
  try {
    return zlib.inflateRawSync(binary).toString('utf8');
  } catch (e1) {
    try {
      return zlib.inflateSync(binary).toString('utf8');
    } catch (e2) {
      throw new Error('decode failed: ' + e1.message);
    }
  }
}

// 从 blog 文章中抽取的 hash 及期望的 Mermaid 代码片段（用于对照）
const samples = [
  {
    name: 'flowchart 声明 (zh/en)',
    hash: 'Sy9KLMhQCHEBAA',
    expect: 'graph TD',
  },
  {
    name: 'flowchart 节点形状',
    hash: 'Sy9KLMhQCHHhUgACx-hn03Y-W9gWC-Y5aTyd0_Zi-SSImCZYzLn6Rf_Gp3sX1YJ5LhogJUCuJkTWVSP62ZK1QKFYCN8tOvrp2gnPV3Q_3dUPMhZirnu0xrOpG571rnu6a7ImRMjD7tmC9mebVzybPv3pjjmxAA',
    expect: 'graph TD',
  },
  {
    name: 'pie 图',
    hash: 'K8hMVSjJLMlJVXi2oP3lohlcCkCg9Hzj7qcdqx2VFKwUnk3d8LRhD7KwE3ZhZ4QwAA',
    expect: 'pie',
  },
  {
    name: 'sequence 图',
    hash: 'K04tLE3NS051yUxML0rM5VIAgoLEopLM5MyCxLwShedTVjzr2I4h_GxO79OuhU9nrsCUmbrhWe-6p7smAwA',
    expect: 'sequenceDiagram',
  },
  {
    name: 'class 图',
    hash: 'S85JLC52yUxML0rM5VIAgmSQgEJocWqRQjVYAAS0M_NKFDJTEPzgkqLMvHSFvMTcVLigLlSwAGhAeX4Rkuqc_PTMPA1NhaT8_BwU0fzSEqBwWT7U6FoA',
    expect: 'classDiagram',
  },
];

console.log('=== 验证 blog 文章中的 hash 是否为 pako 编码 ===\n');

let allOk = true;
for (const { name, hash, expect } of samples) {
  try {
    const decoded = decodeCode(hash);
    const ok = decoded.includes(expect);
    if (!ok) allOk = false;
    console.log(`[${ok ? 'OK' : 'FAIL'}] ${name}`);
    console.log(`  hash 长度: ${hash.length}`);
    console.log(`  解码后长度: ${decoded.length} 字符`);
    console.log(`  解码预览: ${decoded.slice(0, 80).replace(/\n/g, '\\n')}${decoded.length > 80 ? '...' : ''}`);
    if (!decoded.includes(expect)) {
      console.log(`  期望包含: "${expect}" -> 未找到`);
    }
    console.log('');
  } catch (e) {
    allOk = false;
    console.log(`[FAIL] ${name}`);
    console.log(`  解码错误: ${e.message}`);
    console.log('');
  }
}

process.exit(allOk ? 0 : 1);
