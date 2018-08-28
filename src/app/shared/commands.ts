
export const commands =function(){
	return [
{
	keywords:['projects','project'],
	execute:()=>{		
		this.router.navigateByUrl('/projects')
	},
	response:'Here are my projects'
},
{
	keywords:['main page','home page','homepage'],
	execute:()=>{
		this.router.navigateByUrl('/')
	},
	response:'Redirected to the home page'
},
{
	keywords:['do you like to eat'],
	response:'I don\'t eat, I am just a robot'
},
{
	keywords:['try chocolate'],
	response:'Ok i will. Maybe you can get some for me.'
},
{
	keywords:['contact','contacts','get in touch'],
	execute:()=>{
		this.router.navigateByUrl('/contacts')
	},
	response:'You can use any means of communication below or use contact form'
},
{
	keywords:['scroll down','go down'],
	execute:()=>{
		let currentScroll = window.scrollY;
		window.scrollTo(0,currentScroll+100)
	},
	response:'Ok'
},
{
	keywords:['scroll up','go up'],
	execute:()=>{
		let currentScroll = window.scrollY;
		let to = (currentScroll-100) < 0 ? 0 :(currentScroll-100);
		window.scrollTo(0,to)
	},
	response:'Ok'
}
]
} 