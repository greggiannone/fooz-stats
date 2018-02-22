import { Injectable } from '@angular/core';

@Injectable()
export class NameService 
{
	private nameMap = 
	{
		"bdavid": "Bobby David",
		"diverson": "Don Iverson",
		"ggiannone": "Greg Giannone",
		"jchagnon": "Jon Chagnon",
		"jferrin": "Jon Ferrin",
		"mlechner": "Mike Lechner",
		"tkielbasa": "TJ Kielbasa",
		"tstocker": "Tom Stocker",
		"zchupka": "Zac Chupka",
	};

	// Returns the full name of the player based on the username
	name(name: string): string
	{
		return this.nameMap[name];
	}

	/// Returns the initials of the player based on the username
	initials(name: string): string
	{
		var fullName:string = this.nameMap[name];
		var firstLast:string[] = fullName.split(' ');
		return `${firstLast[0].charAt(0)}${firstLast[1].charAt(0)}`;
	}
}
