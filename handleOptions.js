import { Options } from './interfaces/options.js';
import { createFile } from './operations/cretateFiles.js'

export const handleOptions = async ({ operation, arg }) => {

     const path = arg[3];
     if (!path) {
          console.log('Please put the path when you want tu create the file');
          return;
     }

     const options = Options();

     let runOperations = {
          [options.file]: async (path) => await createFile(path),
          [options.del]: async () => console.log('delete'),
          [options.folder]: async () => console.log('folder'),
     };

     (runOperations[operation])
          ? await runOperations[operation](path)
          : console.log('Bad comman please run -> node isa.js help');

}