export default class ProductTypeService {


    static async create(body: any){
        try {
            const response = await fetch('http://localhost:8000/api/product/type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            return await response.json();
        } catch (error) { 
            console.error(error);
            return {
                error: true
            }
        }
        
    }

    static async list(){
        try {
            const response = await fetch('http://localhost:8000/api/product/type', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return await response.json();
        } catch (error) { 
            console.error(error);
            return {
                error: true
            }
        }
    }
}