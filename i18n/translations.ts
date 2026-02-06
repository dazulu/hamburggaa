export const i18n = {
	en: {
		blogPost: {
			readingTimeSuffix: "min read",
			youMightAlsoLike: "You might also like",
			postLabels: "Post labels",
		},
		mobileNavigation: {
			openMenu: "Open menu",
			closeMenu: "Close menu",
		},
		video: {
			play: "Play video",
			pause: "Pause video",
		},
		error: {
			title: "Something went wrong!",
			message: "We apologize for the inconvenience.",
			returnHome: "Return to homepage",
		},
		languageSwitcher: {
			switchLanguage: "Switch to English",
		},
		pronunciation: (phrase: string) => `Play pronunciation for "${phrase}"`,
	},
	de: {
		blogPost: {
			readingTimeSuffix: "Min. lesen",
			youMightAlsoLike: "Das könnte dich auch interessieren",
			postLabels: "Beitrags-Labels",
		},
		mobileNavigation: {
			openMenu: "Menü öffnen",
			closeMenu: "Menü schließen",
		},
		video: {
			play: "Video abspielen",
			pause: "Video pausieren",
		},
		error: {
			title: "Etwas ist schiefgelaufen!",
			message: "Wir entschuldigen uns für die Unannehmlichkeiten.",
			returnHome: "Zurück zur Startseite",
		},
		languageSwitcher: {
			switchLanguage: "Auf Deutsch wechseln",
		},
		pronunciation: (phrase: string) => `Aussprache für „${phrase}" abspielen`,
	},
};
