export default class Task {
    constructor(options = {}) {
      this._dependencies = [];
      this.id = "";
      this.name = "";
      this.start = "";
      this.end = "";
      this._progress = 0.52;
      Object.assign(this, options);
    }
    get progress() {
      return this._progress || 0.52;
    }
    set progress(value) {
      this._progress = value || 0.52;
    }
    setDependencies(value) {
      this._dependencies = Array.isArray(value)
        ? value
        : value.split(",").map((d) => d.trim());
    }
    set dependencies(value) {
      this._dependencies = Array.isArray(value) ? value : value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    get dependencies() {
      return this._dependencies;
    }
  }