interface RouteNames{
	home;
	projects;
	contacts;
}

type MetaData = {
	[key in (keyof RouteNames)]:MetaItem
}

interface MetaItem{
	title:string;
	desc:string;
}

export const metaData:MetaData = {
	home:{
		title:'Home page - Portfolio',
		desc:`Pleshko Pavel. Full stack web developer. Home page. Development and design of websites and web applications.
		Javascript, Angular, React, NodeJs, MongoDb and other technologies.`
	},
	projects:{
		title:'Projects - Portfolio',
		desc:'Pleshko Pavel. Project list. Check out my latest projects listed here. Web applications made with Angular, React, NodeJs'
	},
	contacts:{
		title:'Contacts - Portfolio',
		desc:`Pleshko Pavel. Contact information. Get in touch with me via whatsapp, skype, e-mail or via the website form.
		I will get back to you as soon as possible.`
	}
}