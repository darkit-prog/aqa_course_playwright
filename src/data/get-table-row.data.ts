export const testData = [
    "blabla@gmail.com",
    "jsmith@gmail.com",
    "tconway@earthlink.net",
    "fbach@yahoo.com",
    "jdoe@hotmail.com"
]

export const expectedTable = [
    undefined,
    {
        'Last Name': 'Smith',
        'First Name': 'John',
        Email: 'jsmith@gmail.com',
        Due: '$50.00',
        'Web Site': 'http://www.jsmith.com'
    },
    {
        'Last Name': 'Conway',
        'First Name': 'Tim',
        Email: 'tconway@earthlink.net',
        Due: '$50.00',
        'Web Site': 'http://www.timconway.com'
    },
    {
        'Last Name': 'Bach',
        'First Name': 'Frank',
        Email: 'fbach@yahoo.com',
        Due: '$51.00',
        'Web Site': 'http://www.frank.com'
    },
    {
        'Last Name': 'Doe',
        'First Name': 'Jason',
        Email: 'jdoe@hotmail.com',
        Due: '$100.00',
        'Web Site': 'http://www.jdoe.com'
    }
]

export default { testData, expectedTable };