pipeline {  
    environment {
        sakku_khatam_name= "reg.sakku-khatam.ir/majid.sabet_biz01/dining/front"
    }

    agent { 
        label 'devel'
    }

    stages {

        stage('Build Docker Image') {
            steps{
                    script {
                        sh '''
                        hash=$(git rev-parse origin/$gitlabBranch);
                        docker build \
                            --pull \
                            --force-rm \
                            -t $sakku_khatam_name:$hash . ;
                        '''
                    }
            }
        }    

        stage('Push Docker Image To Sakku Khatam Registry') {
            // when {
            //     expression { gitlabBranch == 'sakku-sandbox' }
            // }
            steps{
                script {
                    sh '''
                    hash=$(git rev-parse origin/$gitlabBranch);
                    docker push $sakku_khatam_name:$hash;
                    '''
                }
            }
        }


    }
}
