import { User } from 'firebase/auth'
import React, { FC, useContext } from 'react'
import { UserFullType } from '../../data/UserContext'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import { View } from 'react-native'
import ProfilButton from './ProfilButton'
import { NormalText } from '../../styles/StyledText'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'

interface ProfilListProps {
    users: (User | UserFullType | UserDataBase)[],
        /**
     * Le nombre d'utilisateurs à afficher dans la liste. Par défaut, 3.
     */
    isPrimary?: boolean,
    nbVisibleUsers?: number,
    small?: boolean,
    isBorderPrimary?: boolean
}

/**
 * Affiche une liste de X (par défault 3) profils d'utilisateurs puis le nombre restant de profils.
 */

const ProfilList: FC<ProfilListProps> = ({users, isPrimary, small, isBorderPrimary, nbVisibleUsers = 3}: ProfilListProps): JSX.Element => {
    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")
    const primary = useThemeColor(theme, "Primary")

    const displayedUsers: (User | UserFullType | UserDataBase)[] = users.slice(0, nbVisibleUsers);

    return (
        <View style={{flexDirection: "row", gap: 10, alignItems: 'center'}}>
            <View style={{flexDirection: "row", gap: -20}}>
                {
                    displayedUsers.map((user, index) => 
                        <ProfilButton key={index} onPress={() => {}}
                            noBadge small={small} disabled 
                            user={user} isPrimary={isPrimary}
                            borderColor={isBorderPrimary ? primary : secondary} borderWidth={3}
                        />
                    )
                }
            </View>

            {
                users.length - nbVisibleUsers > 0 &&
                <NormalText bold text={"+"+ (users.length - nbVisibleUsers)}/>
            }
        </View>
    )
}

export default ProfilList
