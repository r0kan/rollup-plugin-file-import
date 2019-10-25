// [libs]
import path from 'path';
import { createFilter } from 'rollup-pluginutils';
import { Plugin, OutputOptions, OutputBundle } from 'rollup';

// [modules]
import { Files } from './Files';

// types
import { TPluginConfigItem } from './types';

function createPluginFile(config: TPluginConfigItem[]): Plugin {
  const includes = config.reduce<string[]>((res, i) => res.concat(i.extensions), []).map(e => `**/*${e}`);

  const filter = createFilter(includes);

  const files = new Files(config);

  return {
    name: 'file',
    load(filePath: string) {
      if (!filter(filePath)) {
        return null;
      }
      return files.createExport(filePath);
    },
    generateBundle(options: OutputOptions, bundle: OutputBundle) {
      const bundleDir = options.dir || (options.file ? path.dirname(options.file) : __dirname);

      Object.values(bundle).map(i => {
        if (i.type === 'chunk') {
          files.prepareChunk(i, bundleDir);
        }
      });
      files.emit();
    },
  };
}

export default createPluginFile;
