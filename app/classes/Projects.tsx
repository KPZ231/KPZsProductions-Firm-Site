export class Project {
    constructor(
        public title: string,
        public description: string,
        public buttonContent: string,
        public link: string,
        public thumbnail: string,
        public isIframable: boolean = true
    ) {}
}
