export class Pessoa{
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
    

	public get getName(): string {
		return this.name;
	}

	public get getAge(): number {
		return this.age;
	}

	public set setName(value: string) {
		this.name = value;
	}

	public set setAge(value: number) {
		this.age = value;
	}

}