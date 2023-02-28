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
    input AccountInput {
        _id: String
        name: String
        username: String
        category: String
        phone: String
        email: String
        country: String
        city: String
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
    type Info {
        token: String
        dp: String
        org: String
        usr: String
        name: String
        role: String
        perms: Permision
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
        phone: String!
        password: String!
        msgToken: String
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
        createdAt: String
        updatedAt: String
    }
    extend type Query { 
        me: Client
        users: [User]!
        client: Client!
        staff(id: String): User
        staffs: [User]!
        account: Client!
    }
    extend type Mutation {
        signOut: Boolean
        signIn(creds: Creds!): Info
        signUp(info: ClientInfo!): Info
        saveInfo(staff: PersonInput!): User
        deleteStaff(id: String!): StaffId
        updateAccount(accountInfo: AccountInput!): Client
    } 
`;