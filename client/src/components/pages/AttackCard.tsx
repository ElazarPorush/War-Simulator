import { useEffect, useState } from "react"
import { socket } from "../../main"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { IAttack } from "../../types/attack"
import { fetchUser } from "../../redux/slices/userSlice"

interface Props {
    attack: IAttack
}

export default function AttackCard({ attack }: Props) {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [missileDefend, setMissileDefend] = useState("")

    const searchMissiles = () => {
        if (user?.organization.name.split(" ")[0] === "IDF" && attack.status === 'Launched') {
            socket.emit("find missile to defend", { missileSpeed: attack.timeToLeft, user_id: user?._id })
            socket.on("update missile defend", (missileName: string) => {
                setMissileDefend(missileName)
            })
            return true
        }
        return false
    }

    useEffect(() => {
        if (!missileDefend) {
            //turn down button defend
        }
    }, [missileDefend])

    const handleDefend = () => {
        socket.emit("decrease missile", { user_id: user?._id, missileName: missileDefend })
        dispatch(fetchUser({ username: user?.username!, password: user?.password! }))
    }

    const [timeToLeft, setTimeToLeft] = useState(attack.timeToLeft)
    useEffect(() => {
        if (attack.status === "Launched") {
            setTimeToLeft(attack.timeToLeft)
            const timeToLeft = setInterval(() => {
                setTimeToLeft(timeToLeft - 1)
                searchMissiles()
            }, 1000)
            if (attack.timeToLeft === 0){
                clearInterval(timeToLeft)
            }
            socket.emit("set status", {attack_id: attack._id})
        }
    }, [])


    return (
        <tr>
            <td>{attack.missileName}</td>
            <td>{timeToLeft}</td>
            <td><div className="defend">{attack.status}{searchMissiles() ? <p onClick={handleDefend}>❌</p> : <p></p>}</div></td>
        </tr>
    )
}






// import { useEffect, useState } from "react";
// import { socket } from "../../main";
// import { useAppDispatch, useAppSelector } from "../../redux/store";
// import { IAttack } from "../../types/attack";
// import { fetchUser } from "../../redux/slices/userSlice";

// interface Props {
//     attack: IAttack;
// }

// export default function AttackCard({ attack }: Props) {
//     const { user } = useAppSelector((state) => state.user);
//     const dispatch = useAppDispatch();

//     const [missileDefend, setMissileDefend] = useState("");
//     socket.on("update missile defend", (missileName: string) => {
//         setMissileDefend(missileName)
//     })

//     useEffect(() => {
//         const searchMissiles = () => {
//             if (user?.organization.name.split(" ")[0] === "IDF" && attack.status === "Launched") {
//                 socket.emit("find missile to defend", { missileSpeed: attack.timeToLeft, user_id: user._id });
//             }
//         };

//         searchMissiles();

//         setInterval(() => {
//             attack.timeToLeft--;
//             //element must be changing to the the correct time to left
//             searchMissiles();
//         }, attack.timeToLeft * 1000);

//     }, [attack]);

//     useEffect(() => {
//         if (!missileDefend) {
//             // turn down button defend logic
//         }
//     }, [missileDefend]);

//     const handleDefend = () => {
//         if (missileDefend) {
//             socket.emit("decrease missile", { user_id: user?._id, missileName: missileDefend });
//             dispatch(fetchUser({ username: user?.username!, password: user?.password! }));
//         }
//     };

//     return (
//         <tr>
//             <td>{attack.missileName}</td>
//             <td>{attack.status !== "Launched" ? attack.timeToLeft : "//here the func for set interval"}</td>
//             <td>
//                 <div className="defend">
//                     {attack.status}
//                     {missileDefend ? <p onClick={handleDefend}>❌</p> : <p></p>}
//                 </div>
//             </td>
//         </tr>
//     );
// }

