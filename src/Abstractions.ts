export class Drive {
    open(name: string): Directory {
        return null;
    }

    file(path: string): File {
        return null;
    }

    static dir(path: string): string {
        const split = path.split("/");
        return split.slice(0, split.length - 1).join("/");
    }

    static fileName(path: string): string {
        const split = path.split("/");
        return split[split.length - 1];
    }
}

export class Directory {
    path(): string {
        return null;
    }

    open(name: string): Directory {
        return null;
    }

    file(name: string): File {
        return null;
    }
}

export class File {
    path(): string {
        return null;
    }

    name(): string {
        return null;
    }

    dir(): Directory {
        return null;
    }

    async exists() {
        return true;
    }

    async read(): Promise<any> {

    }

    async write(any: any) {

    }

    async delete() {

    }
}