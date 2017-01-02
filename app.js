/*
	App configuration
*/

define([
	"libs/webix-jet-core/core",
	"libs/webix-jet-core/plugins/menu",
	"libs/webix-jet-core/plugins/theme",
	"libs/webix-jet-core/plugins/locale"
], function(
	core, menu, theme, locale
){

	//configuration
	var app = core.create({
		id:         "toolkitweb",
		name:       "Toolkit",
		version:    "0.1.0",
		debug:      true,
		start:      "/top/start",
		appConfig:{
			apiServer:'http://45.79.68.106:8080/Carter/rest/CarterService/'
		},
		urlList:{

		},
		sfdcLogins:{

		},
		sessionData:{

		},
		getApiUrl:function ( suffix ) {
			return this.appConfig.apiServer+suffix

        }
	});

	app.use(menu);
	app.use(theme);
	app.use(locale);
	return app;
});