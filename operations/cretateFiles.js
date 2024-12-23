import fs from "node:fs/promises";

let next = false;

export async function createFile(path) {

  await fs.access(path)
    .then(() => {
      console.log(`the file already exist on path ${path}`)
      next = true;
    })
    .catch(() => { });

  if (next) return next;

  await fs.writeFile(String(path), '')
    .then(() => console.log(`file was created on path -> ${path}`))
    .catch(async () => {

      if (String(path).split('/').length == 3) {

        (
          String(path).startsWith('.', 0) &&
          String(path).startsWith('.', 1) &&
          String(path).startsWith('/', 2)
        )
          ? await fs.mkdir(`../${String(path).split('/')[1]}`)
            .catch((reason) => console.log(reason.message))

          : await fs.mkdir(String(path).split('/')[1])
            .catch((reason) => console.log(reason.message));

      } else {

        let pathFolder = '';
        String(path).split('/').forEach(async value => {
          if (value != '..' && value.split('.').length == 1) {
            pathFolder += `/${value}`;
            (String(path).split('.').length === 4)
              ? await fs.mkdir(`..${pathFolder}`).catch(() => { })
              : await fs.mkdir(`.${pathFolder}`).catch(() => { });
          }
        });
      }

      await createFile(path);

    });

}

