pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
    NODE_ENV = "test"
    SECRET = "ci-test-secret"
    }


    stages {
        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'CI passed: all tests successful'
        }
        failure {
            echo 'CI failed'
        }
    }
}
