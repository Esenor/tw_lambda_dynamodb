S3_BUCKET = "tw--dev--"

namespace :infrastructure do
  # ------------------------------------------------------------------------------
  # Deploy the infrastructure
  desc "Deploy infrastructure, need a NAME as param      # rake infrastructure:deploy NAME"
  task :deploy do 
    ARGV.each { |a| task a.to_sym do ; end }
    if (ARGV.size == 2) 
      sh "aws cloudformation deploy --template-file ./etc/infrastructure.yml --stack-name dev--#{ARGV[1]}--tw--dynamodb--infrastructure --capabilities CAPABILITY_IAM --region eu-west-3 --parameter-overrides Stage=dev Env=#{ARGV[1]}"
      exit 0
    else 
      sh "Need to put a NAME"
      exit 1
    end
  end
end

namespace :function do
  # ------------------------------------------------------------------------------
  # Assemble
  desc "Assemble and build the functions                 # rake function:assemble"
  task :assemble do
      sh "npm i"
      sh "npm run build"
  end

  # ------------------------------------------------------------------------------
  # Package and upload the function
  desc "Package function, need a NAME as param           # rake function:package NAME"
  task :package do
    ARGV.each { |a| task a.to_sym do ; end }
    if (ARGV.size == 2) 
      sh "npm prune --production"
      sh "aws cloudformation package --template-file ./etc/function.yml --region eu-west-3 --s3-bucket #{S3_BUCKET}#{ARGV[1]} --output-template-file ./etc/function-packaged.yml"
    else 
      sh "Need to put a NAME"
      exit 1
    end
  end

  # ------------------------------------------------------------------------------
  # Deploy the function
  desc "Deploy function, need a NAME as param            # rake function:deploy NAME"
  task :deploy do 
    ARGV.each { |a| task a.to_sym do ; end }
    if (ARGV.size == 2) 
      sh "aws cloudformation deploy --template-file ./etc/function-packaged.yml --stack-name dev--#{ARGV[1]}--tw--dynamodb--function --capabilities CAPABILITY_IAM --region eu-west-3 --parameter-overrides Stage=dev Env=#{ARGV[1]}"
      exit 0
    else 
      sh "Need to put a NAME"
      exit 1
    end
  end
end