import * as fs from 'fs'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { cleanupJob, prepareJob } from '../src/hooks'
import TestSetup from './test-setup'

const prepareJobInputPath = path.resolve(
  `${__dirname}/../../../examples/prepare-job.json`
)

let prepareJobOutputPath: string
let prepareJobDefinition: any

let testSetup: TestSetup

jest.useRealTimers()

describe('cleanup job', () => {
  beforeEach(async () => {
    testSetup = new TestSetup()
    testSetup.initialize()

    const prepareJobRawData = fs.readFileSync(prepareJobInputPath, 'utf8')
    prepareJobDefinition = JSON.parse(prepareJobRawData.toString())

    prepareJobOutputPath = `${
      testSetup.testDir
    }/prepare-job-output-${uuidv4()}.json`
    fs.writeFileSync(prepareJobOutputPath, '')

    prepareJobDefinition.args.container.userMountVolumes =
      testSetup.userMountVolumes
    prepareJobDefinition.args.container.systemMountVolumes =
      testSetup.systemMountVolumes
    prepareJobDefinition.args.container.workingDirectory =
      testSetup.containerWorkingDirectory
    prepareJobDefinition.args.container.registry = null
    prepareJobDefinition.args.services.forEach(s => (s.registry = null))

    await prepareJob(prepareJobDefinition.args, prepareJobOutputPath)
  })

  afterEach(() => {
    fs.rmSync(prepareJobOutputPath, { force: true })
    testSetup.teardown()
  })

  it('should cleanup successfully', async () => {
    await expect(cleanupJob()).resolves.not.toThrow()
  })
})
