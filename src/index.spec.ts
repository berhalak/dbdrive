import { InMemoryDrive } from './InMemory';
test('in memory test', async () => {
	const drive = new InMemoryDrive();

	const users = drive.open("system").open("Users");

	const john = users.file("john");

	await john.write({ name: "john" });

	const content = await john.read();

	expect(content.name).toBe("john");

	expect(john.dir().path()).toBe(users.path());

	const abs = await drive.file("/system/Users/john").read();

	expect(abs.name).toBe("john");

	expect(john.name()).toBe("john");

	expect(await john.exists()).toBe(true);

	const all = await users.all();

	expect(all).toHaveLength(1);

	await john.delete();

	expect(await john.exists()).toBe(false);

})