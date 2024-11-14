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

    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        if (!missileDefend) {
            setDisabled(false)
        }
        setDisabled(true)
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
            if (attack.timeToLeft == 0){
                clearInterval(timeToLeft)
            }
            socket.emit("set status", attack._id)
        }
    }, [])


    return (
        <tr>
            <td>{attack.missileName}</td>
            <td>{timeToLeft}</td>
            <td><div className="defend">{attack.status}<button disabled={disabled} onClick={handleDefend}>❌</button></div></td>
        </tr>
    )
}
