import { IAttack } from "../../types/attack"

interface Props {
    attack: IAttack
}

export default function AttackCard({ attack }: Props) {
    return (
        <tr>
            <td>{attack.missileName}</td>
            <td>{attack.timeToLeft}</td>
            <td>{attack.status}</td>
        </tr>
    )
}
