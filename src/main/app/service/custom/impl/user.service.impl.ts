import {UserTo} from "../../../to/user.to.js";
import {UserService} from "../user.service.js";
import {pool} from "../../../config/database.config.js";
import {FactoryRepository, RepositoryType} from "../../../repository/factory.repository.js";
import {UserRepository} from "../../../repository/custom/user.repository.js";

export class UserServiceImpl implements UserService {

    async createNewUserAccount(user: UserTo): Promise<void> {
        const connection = await pool.connect();

        // To do perform the db operation
        // first need to get the User Repository through FactoryRepository
        const userRepo = FactoryRepository.getInstance()
            .getRepository(RepositoryType.USER, connection) as UserRepository;



        // Do the business validation
        // Here simply check the user is already exist by checking the email
        if (await userRepo.existsById(user.email)){
            throw new Error("User already exists");
        }

        // Check the contact number is already link with another user
        if ((await userRepo.findAll()).find(u => u.contact === user.contact)){
            throw new Error("Contact number already associated with another user");
        }

        // if the business validation is okay save the user in DB
        await userRepo.save(user);

        connection.release()
    }
    exitsUserAccount(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getUserAccountDetails(email: string): Promise<UserTo> {
        throw new Error("Method not implemented.");
    }
    deleteUserAccount(email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}