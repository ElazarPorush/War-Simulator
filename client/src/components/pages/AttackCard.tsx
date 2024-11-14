import { socket } from "../../main"
import { useAppSelector } from "../../redux/store"
import { IAttack } from "../../types/attack"

interface Props {
    attack: IAttack
}

export default function AttackCard({ attack }: Props) {
    const { user } = useAppSelector(state => state.user)
    const searchMissiles = () => {
        if (user?.organization.name.split(" ")[0] !== "IDF" || attack.status !== 'Launched') {
            return { relevant: false }
        }
        const missileDefend = socket.emit("find missile to defend", { missileSpeed: attack.timeToLeft, user_id: user._id })
        if (missileDefend) {
            return { relevant: true, missileDefend }
        }
        return { relevant: false}
    }

    const handleDefend = () => {
        
    }

    return (
        <tr>
            <td>{attack.missileName}</td>
            <td>{attack.timeToLeft}</td>
            <td>{attack.status}{searchMissiles().relevant ? <button onClick={() => handleDefend()}>x</button> : <p></p>}</td>
        </tr>
    )
}
