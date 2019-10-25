export type TDir = string;
export type TFilePath = string;
export type TFileExtension = string;

export type TPluginConfigItem = {
  outputDir: TDir;
  extensions: TFileExtension[];
};

export type TPluginConfig = TPluginConfigItem[];

export type TFileInfo = {
  path: TFilePath;
  output: {
    dir: TDir;
    path: TFilePath;
  };
};
