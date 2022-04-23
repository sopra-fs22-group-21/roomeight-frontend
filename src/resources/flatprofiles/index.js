const flatprofiles = [
    {
        id: 4,
        name: 'Schönlein',
        address: 'Schönleinstrasse 14, 8032 Zürich',
        rent: 625,
        permanent: true,
        numberOfRoommates: 5,
        roomSize: 20.0,
        numberOfBaths: 2,
        roommates: [
            {
                id: 5,
                firstName: 'Samuel',
                lastName: 'Drack',
                isComplete: true,
                description: 'Med student in 4th year, like to cook',
                biography: 'med student @UZH from AG',
                tags: ['COOKING', 'STUDENT'],
                pictureReference: [
                    'https://dbe.unibas.ch/fileadmin/user_upload/dbe/Samuel_Drack_200x300.jpg?1629224422',
                ],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                birthday: '1997-01-07',
                email: 'saemi@gmail.com',
                gender: 'MALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
            {
                id: 6,
                firstName: 'Emilie',
                lastName: 'Späth',
                isComplete: true,
                description: 'Med student in 3rd year',
                biography: 'Rappi Swag',
                tags: ['SPORTS', 'WOKO'],
                pictureReference: [
                    'https://pbs.twimg.com/profile_images/915010075734941696/Roxn5c0I_400x400.jpg',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFuJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                    'https://pbs.twimg.com/profile_images/915010075734941696/Roxn5c0I_400x400.jpg',
                ],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                birthday: '1997-01-07',
                email: 'emilie@gmail.com',
                gender: 'FEMALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
            {
                id: 7,
                firstName: 'Louis',
                lastName: 'Jetzer',
                isComplete: true,
                description: 'Psychology student @UZH',
                biography: 'King Louis',
                tags: ['CULTURE', 'WINE'],
                pictureReference: [
                    'https://pbs.twimg.com/profile_images/3383710369/ca4291b8d16067615b935454a476f543_400x400.jpeg',
                ],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                gender: 'MALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
            {
                id: 8,
                firstName: 'Lou',
                lastName: 'Michel',
                isComplete: false,
                description: 'Not often home, always travelling....',
                biography: 'coming soon...',
                pictureReference: [],
                tags: ['COFFEE'],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                gender: 'FEMALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
        ],
        description:
            "We're a WOKO flat looking for a new rooomie, right next to the university",
        biography: 'Come live with us',
        tags: ['CLEANLINESS', 'COFFEE', 'WOKO', 'STUDENT'],
        pictureReference: [
            'https://www.wiwo.de/images/imago82055814h/22874812/4-format1001.jpg',
        ],
        matches: [],
        creationDate: '2022-04-19',
        onlineStatus: 'Offline',
        moveInDate: '2022-05-01',
        moveOutDate: '',
        isFlat: true,
    },
    {
        id: 9,
        name: 'Hutten-WG',
        address: 'Huttenstrasse 58, 8006 Zürich',
        rent: 700,
        permanent: false,
        numberOfRoommates: 4,
        roomSize: 19.0,
        numberOfBaths: 1,
        roommates: [
            {
                id: 10,
                firstName: 'Cyril',
                lastName: 'Ludwig',
                isComplete: true,
                description: 'Chemistry Engineer in my masters. Nerd Alert',
                biography: 'I love memes',
                tags: ['COOKING', 'STUDENT'],
                pictureReference: [
                    'https://media-exp1.licdn.com/dms/image/C4E22AQEKRlVgk-WCxQ/feedshare-shrink_800/0/1646674571492?e=2147483647&v=beta&t=2OGbVVc3wcs-lqmq5MEF3-iRJMivXjG9qLBLVg0gc5c',
                ],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                birthday: '1996-01-07',
                email: 'cyril@gmail.com',
                gender: 'MALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
            {
                id: 11,
                firstName: 'Konstantin',
                lastName: 'Tempel',
                isComplete: true,
                description: 'Pilot to be, guitarist',
                biography: 'Feeling alright',
                tags: ['INSTRUMENTS'],
                pictureReference: [
                    'https://www.kameramann.de/app/uploads/2020/06/02_PIC-02-320x286.jpg',
                ],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                birthday: '1995-01-19',
                email: 'konsti@gmail.com',
                gender: 'MALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
            {
                id: 12,
                firstName: 'Luisa',
                lastName: 'Stückelberger',
                isComplete: true,
                description: 'computer science student',
                biography: 'Häcker',
                tags: ['COFFEE', 'INSTRUMENTS', 'PARTY'],
                pictureReference: [
                    'https://lh3.googleusercontent.com/kFvEhdvCCL09QnVXw3SyxruW8FVfTLhfQramcN9nNtu6x0FG7dlTKXeY1RmXls7gSRUMQTNXkK_OmDIcso8PKu_WhOORPpgL9uq88cn8wxo6glfO28VR4bltqmCWTL795jsOkRQ9uZVDCK_KlNqCKH2D_4gfZopMV88uJtaGS5yNt_vHxjgnLH2Iw5H59jPUvbaPAUMtGaMYq0Vh924DD57EoQWKcGC9IASRSKEAHzKh9PT3nge3QS7hU9ipMJxI5r0aR2-cAZcRTvN0oepWcR9Rt6zq_vztv1FQhAKYFUcon2-VO3kj7x0F6es1trNOr_mWMRPl05Y8m_pCM0UR5RzFjuL0VCGvVUvSLrV8Mfz5DxGFNXbWY1wE73UF2_piXfW10vr95XqbJquwBaM440HUi9e9S5aDwF_xzOTdHXIoGft2Qn582peIjHOGaPZlyM4AoAZ3ZH6_J5FoCxdOP160cqvtp5bri2o8sNF03eImRVsfoR8YCp_b-g8q9K6rhjPSFDomSdu0jxjtPITieITcAcMLy4nyZCXdIwarYreXDi0XSN_3WgCN1fcjj3g9qOolC5fSO1TsLc0EsustMYsALHS3EBeBQd0fCTcAqzqkxbzy1BCUOS9Aig_uI7p7UK3U2sFPjjx1tYyOniqNQE_QUcH_9gjclW2WEVR3zci6Oo2RqEpb7OrR9_JYUXSndhCfVSGkQzrwt8jizAgKOY5MhN_eoPeR73PRRgOw4TH9BO25_K2TYWFRW0gogw=w1278-h1696-no?authuser=0',
                    'https://vc-smash.ch/img/asset/YXNzZXRzL3RlYW1mb3Rvcy9ENC0yMDIxLTIyLmpwZWc=?fit=crop-51-34-1&w=1800&h=600&dpr=2&fm=webp&s=58a5b80a46d99ae2bc0cf8dba5ae34c4',
                ],
                creationDate: '2022-04-19',
                onlineStatus: 'Offline',
                gender: 'FEMALE',
                isSearchingRoom: false,
                isAdvertisingRoom: true,
            },
        ],
        description:
            "We're a JUWO in the nicest location there is. Your room has a view over the whole city!",
        biography: 'Come live with us - Pleaase',
        tags: ['COFFEE', 'JUWO', 'INSTRUMENTS'],
        pictureReference: [
            'https://img.welt.de/img/regionales/hamburg/mobile102117523/4001354437-ci16x9-w1200/rb-WG-24-07-DW-Sonstiges-Hamburg-jpg.jpg',
        ],
        matches: [],
        creationDate: '2022-04-19',
        onlineStatus: 'Offline',
        moveInDate: '2022-04-01',
        moveOutDate: '',
        isFlat: true,
    },
];

export default flatprofiles;
