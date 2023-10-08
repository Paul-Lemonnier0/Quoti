import {addDays} from "date-fns";

const feelingImages = [
    require('../img/FeelingEmojis/angry.png'),
    require('../img/FeelingEmojis/anxious.png'),
    require('../img/FeelingEmojis/awesome.png'),
    require('../img/FeelingEmojis/chut.png'),
    require('../img/FeelingEmojis/disgusted.png'),
    require('../img/FeelingEmojis/happy.png'),
    require('../img/FeelingEmojis/hearteyes.png'),
    require('../img/FeelingEmojis/inlove.png'),
    require('../img/FeelingEmojis/mid.png'),
    require('../img/FeelingEmojis/normal.png'),
    require('../img/FeelingEmojis/party.png'),
    require('../img/FeelingEmojis/proud.png'),
    require('../img/FeelingEmojis/sad.png'),
    require('../img/FeelingEmojis/struggeling.png'),
    require('../img/FeelingEmojis/tong.png'),
    require('../img/FeelingEmojis/verysad.png'),
  ];

const generateRandomFeeling = (habitude, howManyDay) => {
    const today = new Date()

    const FeelingAndFillData = []

    for(let i = 0; i<howManyDay; ++i)
    {
        const randomFeelingImage = feelingImages[Math.floor(Math.random() * feelingImages.length)];

        FeelingAndFillData.push({
            date: addDays(today, -i),
            doneSteps: Math.floor(Math.random() * habitude.totalSteps),
            image: randomFeelingImage,
            habit: habitude,
            done: Math.floor(Math.random() * 2),
            due: Math.floor(Math.random() * 2),
            id: i
        })
    }
    return FeelingAndFillData
} 

export default generateRandomFeeling