export class ApiConfig {
    private static baseUrl = "https://staging.officernd.com/api/v1/organizations/assignment-demo";
    private static headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM5MzJiZTU5YmU1MjcwNGMzMGZhOSIsImlhdCI6MTYwNTg3NTc5OCwiZXhwIjoxNjM3NDExNzk4fQ.U83_KnUAkPoI65NPwGyET_4HNiF4Lvd7pl6RLHhWSFM"
    };
 
    public static getBaseUrl() {
        return this.baseUrl;
    }
 
    public static getDefaultHeaders() {
        return this.headers;
    }
}