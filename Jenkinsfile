pipeline {
    agent any

    environment {
        NODE_ENV = "test"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
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
            echo 'CI failed: tests did not pass'
        }
    }
}
