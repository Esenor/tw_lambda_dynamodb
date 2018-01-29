namespace :infrastructure do
  # ------------------------------------------------------------------------------
  # Package and upload the infrastructure
  desc "Package infrastructure"
  task :package do
      sh "aws cloudformation package --template-file ./etc/infrastructure.yml --region eu-west-3 --s3-bucket dojo.lambda --output-template-file ./etc/infrastructure-packaged.yml"
  end

  # ------------------------------------------------------------------------------
  # Deploy the infrastructure
  desc "Deploy infrastructure"
  task :deploy do 
    ARGV.each { |a| task a.to_sym do ; end }
    if (ARGV.size == 2) 
      sh "aws cloudformation deploy --template-file ./etc/infrastructure-packaged.yml --stack-name dev--#{ARGV[1]}--tw--dynamodb--infrastructure --capabilities CAPABILITY_IAM --region eu-west-3 --parameter-overrides Stage=dev Env=#{ARGV[1]}"
      exit 0
    else 
      sh "Need to put YOUR_NAME"
      exit 1
    end
  end
end

namespace :function do
  # ------------------------------------------------------------------------------
  # Assemble
  desc "Assemble"
  task :assemble do
      sh "npm i"
      sh "npm run build"
      sh "npm prune --production"
  end

  # ------------------------------------------------------------------------------
  # Package and upload the function
  desc "Package function"
  task :package do
      sh "aws cloudformation package --template-file ./etc/function.yml --region eu-west-3 --s3-bucket dojo.lambda --output-template-file ./etc/function-packaged.yml"
  end

  # ------------------------------------------------------------------------------
  # Deploy the function
  desc "Deploy function"
  task :deploy do 
    ARGV.each { |a| task a.to_sym do ; end }
    if (ARGV.size == 2) 
      sh "aws cloudformation deploy --template-file ./etc/function-packaged.yml --stack-name dev--#{ARGV[1]}--tw--dynamodb--function --capabilities CAPABILITY_IAM --region eu-west-3 --parameter-overrides Stage=dev Env=#{ARGV[1]}"
      exit 0
    else 
      sh "Need to put YOUR_NAME"
      exit 1
    end
  end
end