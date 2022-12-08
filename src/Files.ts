// [libs]
import fs from 'fs';
import path from 'path';
import {OutputChunk, OutputOptions} from 'rollup';

// utils
import { mkDirSync } from './utils';

// types
import { TPluginConfig, TFileInfo, TFilePath, TFileExtension, TDir } from './types';

export class Files {
  private itemsMap: Map<TFilePath, TFileInfo>;

  private outputMap: Map<TFileExtension, TDir>;

  constructor(config: TPluginConfig) {
    this.itemsMap = new Map();
    this.outputMap = new Map();

    config.forEach(item => {
      item.extensions.forEach(extension => {
        this.outputMap.set(extension, item.outputDir);
      });
    });
  }

  createExport(filePath: string): string {
    const fileInfo = this.add(filePath);

    return `const file = require('#${fileInfo.path}#'); export default file;`;
  }

  prepareChunk(outputChunk: OutputChunk, bundleDir: string, format: OutputOptions['format']): void {
    this.itemsMap.forEach(fileInfo => {
      const chunkDir = path.dirname(`${bundleDir}${path.sep}${outputChunk.fileName}`);

      if (format == 'es' || format === 'esm') {
        outputChunk.code = outputChunk.code.replace(
            `require('#${fileInfo.path}#`,
            `import('#${fileInfo.path}#`,
        );
      }

      outputChunk.code = outputChunk.code.replace(
        `#${fileInfo.path}#`,
        `.${path.sep}${path.relative(chunkDir, fileInfo.output.path)}`,
      );
    });
  }

  emit(): void {
    this.itemsMap.forEach(fileInfo => {
      mkDirSync(fileInfo.output.dir);
      fs.writeFileSync(fileInfo.output.path, fs.readFileSync(fileInfo.path));
    });
  }

  private add(filePath: string): TFileInfo {
    const existedFile = this.itemsMap.get(filePath);
    if (existedFile) {
      return existedFile;
    }
    const extension = filePath.split('.').pop();

    if (typeof extension !== 'string') {
      throw new Error(`Unexpected file extension for: ${filePath}`);
    }

    const outputDir = this.outputMap.get(`.${extension}`);
    if (!outputDir) {
      throw new Error(`Resolve output dir error for file: ${filePath}`);
    }

    const name = path.basename(filePath);

    const fileInfo: TFileInfo = {
      path: filePath,
      output: {
        dir: outputDir,
        path: `${outputDir}${path.sep}${name}`,
      },
    };
    this.itemsMap.set(filePath, fileInfo);

    return fileInfo;
  }
}
