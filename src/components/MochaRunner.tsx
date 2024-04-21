import React, { useEffect, useRef } from 'react'
// import mocha from 'mocha'
import { should, expect } from 'chai'

interface MochaRunnerProps {
    testCode: string
}
declare global {
  interface Window {
    mocha: any
  }
}

// We need to extract the describe block from the test code, 
// because we need to run it without the import statements generated,
// that is causing an error in the Mocha runner: 
// "Uncaught SyntaxError: Cannot use import statement outside a module"
function extractDescribe(testCode: string): string {
    const describeRegex = /describe\(([^)]+)\)[\s\S]*?((it\(([^)]+)\)[\s\S]*?\})*)\}/g
    const describeMatches = testCode.match(describeRegex)
    if (describeMatches) {
        // return describeMatches.join('\n')
        // hack and just for now, we will return only the second describe block 
        // adding the closing parenthesis and bracket to avoid syntax errors
        return describeMatches[1] + ')})'
    }
    return ''
}

const MochaRunner: React.FC<MochaRunnerProps> = ({ testCode }) => {
    const hasRunTests = useRef(false)
    useEffect(() => {
        if (hasRunTests.current) {
            return
        }
        // Set up Mocha
        window.mocha.setup({
            ui: 'bdd',
            cleanReferencesAfterRun: false
        })
        window.mocha.checkLeaks()
        
        // Add the describe blocks
        const describeCode = extractDescribe(testCode)
        console.log(describeCode)

        // Add the tests
        // @todo - WARN the user in the UI if he understands the risks and still want to run the code
        // eslint-disable-next-line no-new-func
        new Function('should', describeCode)(should)
        // eslint-disable-next-line no-new-func
        // new Function('expect', testCode)(expect)

        // Run the tests
        window.mocha.run()
        hasRunTests.current = true
        // cleanup after the tests
        return () => {
            window.mocha.suite.suites = []
            window.mocha.suite.tests = []
            window.mocha.suite._beforeEach = []
            window.mocha.suite._beforeAll = []
            window.mocha.suite._afterEach = []
            window.mocha.suite._afterAll = []
        }
    }, [testCode])

    return <div id="mocha"></div>
}

export default MochaRunner
