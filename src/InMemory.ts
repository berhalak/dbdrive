import { Drive, Directory, File } from "./Abstractions";

export class InMemoryDrive implements Drive {
    delete(arg0: string): Promise<void> {
        this.db.delete(arg0);
        return Promise.resolve();
    }
    write(arg0: string, any: any): Promise<void> {
        this.db.set(arg0, any);
        return Promise.resolve();
    }
    read(arg0: string): Promise<any> {
        return Promise.resolve(this.db.get(arg0));
    }

    db: Map<string, any> = new Map();

    exists(fullFilePath: string): Promise<boolean> {
        return Promise.resolve(this.db.has(fullFilePath));
    }

    open(name: string): Directory {
        return new MemDir("", name, this);
    }

    file(path: string): File {
        return MemFile.fromAbsolute(path, this);
    }

    /**
     *
     */
    constructor() {
        console.warn("In memory drive is being used");
    }
}

class MemDir implements Directory {
    static fromAbsolute(path: string, db: InMemoryDrive): Directory {
        return new MemDir(Drive.dir(path), Drive.fileName(path), db);
    }

    constructor(public parent: string, public name: string, public db: InMemoryDrive) {

    }

    async all(): Promise<File[]> {
        const all = [...this.db.db.entries()];
        const paths = all.filter(x => x[0].startsWith(this.path()) && !x[0].replace(this.path() + "/", "").includes("/")).map(x => x[0]);
        return paths.map(x => this.db.file(x));
    }

    path(): string {
        return `${this.parent}/${this.name}`
    }

    open(name: string): Directory {
        return new MemDir(this.path(), name, this.db);
    }

    file(name: string): File {
        return MemFile.fromDirectory(this.path(), name, this.db);
    }
}

class MemFile implements File {
    static fromDirectory(dirPath: string, name: string, db: InMemoryDrive): File {
        return new MemFile(dirPath, name, db);
    }

    static fromAbsolute(path: string, db: InMemoryDrive): File {
        return new MemFile(Drive.dir(path), Drive.fileName(path), db);
    }

    constructor(public dirPath: string, public _name: string, public db: InMemoryDrive) {

    }

    path(): string {
        return `${this.dirPath}/${this._name}`;
    }
    name(): string {
        return this._name;
    }
    dir(): Directory {
        return MemDir.fromAbsolute(this.dirPath, this.db);
    }
    exists(): Promise<boolean> {
        return this.db.exists(this.path());
    }
    read(): Promise<any> {
        return this.db.read(this.path());
    }
    write(any: any): Promise<void> {
        return this.db.write(this.path(), any);
    }
    delete(): Promise<void> {
        return this.db.delete(this.path());
    }

}