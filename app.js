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
		id:         "forceput",
		name:       "Forceput",
		version:    "0.1.0",
		debug:      true,
		start:      "/forceput/toolkits",
		appConfig:{
			apiServer:'http://45.79.68.106:8080/Carter/rest/CarterService/',
			CARTER:{
                apiServer:'http://45.79.68.106:8080/Carter/rest/CarterService/'
			}
		},
		urlList:{

		},
		sfdcLogins:{

		},
		sessionData:{

		},
		getApiUrl:function ( suffix ) {
			return this.appConfig.apiServer+suffix

        },
		getCarterApiUrl:function ( suffix ) {

            return this.appConfig.CARTER.apiServer+suffix
        }
	});


    if (!webix.env.touch && webix.ui.scrollSize) {
        webix.CustomScroll.init();
    }

	app.use(menu);
	app.use(theme);
	app.use(locale);
	return app;
});