const surahs = [
    {
        id: 100,
        name: 'Surah Al-Fatiha',
        number: 1,
        surah_notes: [
            {
                id: 202,
                surah_id: 100,
                title: 'Notes For Surah Al-Fatiha',
                content: `This surah is the first surah in the Qur'an. It's aslo know for other names like Umm Al-Kitab(the mother of the book), Al-Hamd and As-Salah`
            }
        ],
        ayahs: [
            {
                id: 102,
                surah_id: 100,
                ayah_number: 2,
                content: `All praise is due to Allah, the Lord of all Worlds`
            }
        ],
        topics: [
            {
                id: 302,
                surah_id: 11,
                title: 'This is another Examle title',
                content: 'This is another Examle content'
            }
        ]
    },
    {
        id: 200,
        name: 'Surah Al-Kawthar',
        number: 108,
        surah_notes: [
            {
                id: 201,
                surah_id: 200,
                title: 'Notes For Surah Al-Kawthar',
                content: `This surah is the shortest surah in the Qur'an.`
            }
        ],
        ayahs: [
            {
                id: 101,
                surah_id: 100,
                ayah_number: 2,
                content: `So pray to your Lord and sacrifice[to Him alone]`
            }
        ],
        topics: [
            {
                id: 301,
                surah_id: 10,
                title: 'This is the first Examle title',
                content: 'This is the first Examle content'
            }
        ]
    }
]

const plainNotes = [
    {
        id: 1000,
        title: "Qur'an Studies",
        content: `The book of Islamic revelation; scripture. The term means “recitation.” The Quran is believed to be the word of God transmitted through the Prophet Muhammad . The Quran proclaims God's existence and will and is the ultimate source of religious knowledge for Muslims. `
    },
    {
        id: 1000,
        title: "Qur'an Studies 2",
        content: `The Quran serves as both record and guide for the Muslim community, transcending time and space. Muslims have dedicated their best minds and talents to the exegesis and recitation of the Quran. `
    }
]


const data = {
    surahs,
    plainNotes
}

export default data;