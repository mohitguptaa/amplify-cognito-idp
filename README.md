This is a sample project to get started on a microsite for User Authentication using AWS cognito.

Tech Stack
----------

* Vue.js
* Amplify
* AWS Cognito
* AWS S3 hosting
* API Gateway & Lambda Function

This repo demonstrates the following features:
* Creating serverless APIs for User Creation, Deletion, etc.
* Creating Vue.js App for Login, Password Reset pages.
* Enabling two factor authentication using TOTP.

Getting started
--------------

#### Pre-requisites:
```
npm install -g @aws-amplify/cli
amplify configure
```

#### Clone the repo:
```
git clone https://github.com/mohitguptaa/amplify-cognito-idp.git
```

In the root folder run:
* `npm install` - This will install all the dependencies
*  `amplify init` - This will create a new environment and initialise it in the cloud, your AWS profile which you set using `amplify configure`
* `amplify publish` - This will publish the Vue App on S3 bucket


This will create following resources in the cloud:
* Hosted Vue App on S3
* API to create user in API Gateway & lambda function

`amplify status` will show you all of these resources and the hosted endpoints

The hosted UI will serve the Login page. Try logging in with random username/password and you will see an error. This is because there are no users exists.

### Update lambda & its permissions
##### Update lambda
In _amplify/backend/function/createUser/src/app.js_ replace:
* `<your-user-pool-id>` with the newly created user pool id found in _src/aws-exports.js_
*  `<your-tmp-password>` with desired temporary password

#### Give permissions
We have to give the newly created lambda to create, delete users in the newly created userpool in AWS cognito. For this, open _amplify/backend/function/createUser/createUser-cloudformation-template.json_ and add following statement to `lambdaexecutionpolicy`

```
{
    "Effect": "Allow",
        "Action": [
            "cognito-idp:AdminDeleteUser",
            "cognito-idp:AdminCreateUser"
        ],
            "Resource": {
        "Fn::Sub": [
            "arn:aws:cognito-idp:${region}:${account}:userpool/<your-user-pool-id>",
            {
                "region": {
                    "Ref": "AWS::Region"
                },
                "account": {
                    "Ref": "AWS::AccountId"
                }
            }
        ]
    }
}
```

Remember to replace `<your-user-pool-id>` with your newly created user pool id.

Then in the root folder run `amplify push`

Creating new user
-------

This repo comes with an example to demonstrate calling API, we just created with amplify. Open _examples/create_user.js_ and replace following:
* `<user-email>` with desired user's email
* `<api-gateway-host>` with the API gateway endpoint, you can find this in _src/aws-exports.js_
* `<your-aws-account-access-key>` and `<your-aws-account-secret>` with your AWS IAM admin user credentials

Run this example and it will create a new user.

All Set
---------

Now try to log in to the UI and it should start working. It will allow you to set 2 factor authentication and redirect on success login. Enjoy!!



