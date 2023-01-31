const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepository;
  let userCreateService;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  });

  it("user should be created", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@test.com",
      password: "123456",
    }


    // Call the execute method of the userCreateService to create a new user. Store the result in a variable called createdUser.  
    const createdUser = await userCreateService.execute(user);

    console.log(createdUser);

    // Expect that the createdUser object has a property called id.  
    expect(createdUser).toHaveProperty("id");

    // Expect that the name, email and password of the createdUser object are equal to the respective properties of the user object passed in as an argument.  
    expect(createdUser).toMatchObject({ name: user.name, email: user.email, password: expect.not.stringMatching(user.password) });

  });

  it("should not be able to create a user with an email that already exists", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@test.com",
      password: "123456",
    }

    await userCreateService.execute(user);   // Call the execute method of 'userCreateService' with 'user' as an argument and await its result (as this is an asynchronous operation). 

    // Expect that calling 'execute' on 'userCreateService' with 'user' as an argument will throw an error (as the email already exists) and that this error will be an instance of AppError class. 

    await expect(userCreateService.execute(user)).rejects.toBeInstanceOf(AppError);

    // Expect that this error message will be "Email already in use" and its status will be 400 (Bad Request). 

    await expect(userCreateService.execute(user)).rejects.toEqual(new AppError("Email already in use", 400));
  })
})
