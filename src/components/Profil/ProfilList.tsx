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
    users: (User | UserFullType | UserDataBase)[]
}

const ProfilList: FC<ProfilListProps> = ({users}) => {
    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")

    const displayedUsers: (User | UserFullType | UserDataBase)[] = users.slice(0, 3);

    return (
        <View style={{flexDirection: "row", gap: 10, alignItems: 'center'}}>
            <View style={{flexDirection: "row", gap: -25}}>
                {
                    displayedUsers.map((user, index) => 
                        <ProfilButton key={index} onPress={() => {}}
                            noBadge small disabled 
                            user={user} 
                            borderColor={secondary} borderWidth={3}
                        />
                    )
                }
            </View>

            {
                users.length-3 > 0 &&
                <NormalText bold text={"+"+ (users.length-3)}/>
            }
        </View>
    )
}

export default ProfilList