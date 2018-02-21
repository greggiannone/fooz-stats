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

	name(name: string)
	{
		return this.nameMap[name];
	}
}
