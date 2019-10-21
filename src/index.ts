import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { createFilter } from 'rollup-pluginutils';
import { Plugin, OutputOptions, OutputBundle } from 'rollup';

const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
const includes = extensions.map(e => `**/*${e}`);
const outputDir = 'images';

type TConfigItem = {
  outputDir: string;
  extensions: string[];
};

type TFileInfo = {
  id: string;
  path: string;
  name: string;
};

function createPluginFile(_config: TConfigItem): Plugin {
  const filter = createFilter(includes);

  const fileMap: Map<string, TFileInfo> = new Map();

  return {
    name: 'file',
    load(id) {
      if (!filter(id)) {
        return null;
      }

      if (!fileMap.has(id)) {
        fileMap.set(id, {
          id: id,
          path: id,
          name: path.basename(id),
        });
      }
      return `const file = require('#${id}#'); export default file;`;
    },
    generateBundle(options: OutputOptions, bundle: OutputBundle) {
      Object.values(bundle).map(i => {
        if (i.type === 'chunk') {
          fileMap.forEach(fileInfo => {
            i.code = i.code.replace(`#${fileInfo.id}#`, `../images/${fileInfo.name}`);
          });
        }
      });
      let dir = options.dir || (options.file ? path.dirname(options.file) : __dirname);
      dir = `${dir}/${outputDir}`;

      /*fsExtra.ensureDirSync(dir);

      images.forEach(id => {
        fs.writeFileSync(`${dir}/${path.basename(id)}`, fs.readFileSync(id));
      });*/
    },
  };
}

export default createPluginFile;
