import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import users from "../services/users";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useQueryClient } from "@tanstack/react-query"; 

const BeAMerchant
 = () => {
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const merchantMutation = useMutation({
        mutationFn: () => users.BeAMerchant( {headers: {Authorization: `Bearer ${user.token}`}}),
        onSuccess: () => {
            queryClient.invalidateQueries('user')
            navigate('/');
        },
        onError: (error) => {
            console.error('Error adding to , merchants:', error);
        }
        
            })
    const handle = async (e) => {
        e.preventDefault();
        merchantMutation.mutate();
    }
    return (
        <div>
            <div className="flex flex-col gap-2 p-5">
                <h1 onClick={() => navigate('/')} className="font-playwrite text-3xl cursor-pointer">bookstore</h1>
                <p className="text-sm text-gray-500">Sell Your Books With us</p>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <form onSubmit={handle} className="flex flex-col gap-4 p-5">
                    <input type="text" placeholder="Name" className="border border-gray-300 p-2" />
                    
                    <textarea placeholder="Bio" className="border border-gray-300 p-2"></textarea>
                    <button type="submit" className="bg-spearmint px-4 py-2">Apply</button>
                </form>
            </div>
        </div>
    )
}

export default BeAMerchant
