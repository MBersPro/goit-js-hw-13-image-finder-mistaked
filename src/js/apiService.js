class apiService {
    baseUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
    constructor() {
        this.q = "";
        this.pageNumber = 1;
    }
    func() {
        const fullUrl = new URLSearchParams({
            per_page: 12,
            key: "23324590-4bab2876940c1b311e9de8456",
            page: this.pageNumber,
            q: this.q,
        });
        fetch(`${this.baseUrl}${fullUrl}`).then(reponse => response.json()).then(console.log)
    }
}