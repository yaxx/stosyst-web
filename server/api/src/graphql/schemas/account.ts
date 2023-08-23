import { gql } from 'apollo-server-express';

export default gql`
    input PersonInput {
        _id: String
        isAdmin: Boolean
        username: String
        firstName: String
        lastName: String
        category: String
        phone: String
        email: String
        password: String
        address: String
        position: String
        department: String
        dp: String
        banner: String
        permisions: PermisionInput
        createdAt: String
        updatedAt: String
    }
    input ClientInput {
        _id: String
        name: String
        username: String
        category: String
        phone: String
        email: String
        password: String
        country: String
        city: String
        banner: String
        address: String
        dp: String
        msgTokens: [String]
        createdAt: String
        updatedAt: String
    }
    input AccInput {
        _id: String
        name: String
        category: String
        username: String
        phone: String
        email: String
        address: String
        dp: String
        banner: String
        createdAt: String
    }
    input PermisionInput {
        creates: [String]
        edits: [String]
        deletes: [String]
    }
    type Permision {
        creates: [String]
        edits: [String]
        deletes: [String]
    }
    
    type Client {
        _id: String
        name: String
        username: String
        category: String
        phone: String
        email: String
        password: String
        country: String
        city: String
        banner: String
        address: String
        staffs: [User]
        dp: String
        createdAt: String
        updatedAt: String
    }
    type User {
        _id: String
        firstName: String
        lastName: String
        category: String
        phone: String
        email: String
        password: String
        address: String
        position: String
        department: String
        dp: String
        banner: String
        permisions: Permision
        createdAt: String
        updatedAt: String
    }
   
    type StaffId {
        id: String
    }
    input Creds {
        isAdmin: Boolean
        phone: String!
        password: String!
        msgToken: String
    }
    input ClientInfo {
        name: String!
        category: String
        phone: String!
        password: String!
        msgToken: String
    }
    input AddAccInput {
        name: String!
        username: String!
        address: String
        curClientId: String!
    }
    type User {
        _id: String
        firstName: String
        lastName: String
        category: String
        phone: String
        email: String
        password: String
        address: String
        position: String
        department: String
        dp: String
        banner: String
        permisions: Permision
        createdAt: String
        updatedAt: String
    }
    type TimeLine {
        due: String
        renewed: String
        status: String
    }
    type PaymentMethod {
        cardNumber: String
        expiry: String
        cvvCode: String
    }
    type Client {
        _id: String
        name: String
        username: String
        category: String
        phone: String
        email: String
        password: String
        address: String
        staffs: [User]
        dp: String
        timeLine: TimeLine
        linkedTo: [Client]
        paymentMethods: [PaymentMethod]
        createdAt: String
        updatedAt: String
    }
    type Info {
        token: String
        client: Client
    }
    extend type Query {
        me: Client
        users: [User]!
        client: Client!
        staff(id: String): User
        staffs: [User]!
        account: Client!
        accDetails: Client
        switchAccount(id: String): Info
    }
    extend type Mutation {
        signOut: Boolean
        signIn(creds: Creds!): Info
        signUp(info: ClientInfo!): Info
        addAccount(input: AddAccInput!): Client
        saveInfo(staff: PersonInput!): User
        deleteStaff(id: String!): StaffId
        # updateAccount(input: AccInput): Client
    } 
`;