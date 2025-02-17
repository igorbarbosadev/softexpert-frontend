export default class SaleRegistrationService {

    static async create(body: any): Promise<any> {
        const response = await fetch('http://localhost:8000/api/sale-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const requestReponse = await response.json();
        if(requestReponse.status !== 201){
            return { error: true };
        }
        
        return requestReponse;
    }
    
}