import { handleOptions } from "./handleOptions.js";

export const main = async () => {

    const arg = process.argv;
    const operation = arg[2];

    const values = {
        operation,
        arg,
    };

    await handleOptions(values)
        .catch((reason) => console.log(reason.message));
}


main();