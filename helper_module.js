
class HelperModule {

	static clean(t) {
		if (typeof(t) === "string") {
			return t.replace(/`/g, "`" + String.fromCharCode(8203).replace(/@/g, "@" + String.fromCharCode(8203)));
		}
		else {
			return t;
		}
	}
	
}

module.exports = HelperModule;