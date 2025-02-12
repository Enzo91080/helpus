import { connect, clearDatabase, disconnect } from '../utils/test-db'
import { Donation } from '@/lib/models/donation.model'
import { Donor } from '@/lib/models/donors.model'
import { Beneficiary } from '@/lib/models/beneficiary.model'
import { DonationType } from '@/types/IDonor'
import { BeneficiaryStatus } from '@/types/IBeneficiary'
import mongoose from 'mongoose'

describe('Donations API', () => {
  beforeAll(async () => {
    await connect()
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await disconnect()
  })

  it('should create a new donation', async () => {
    const donor = new Donor({ 
        name: 'Test Donor', 
        email: 'donor@test.com',
        donationType: DonationType.FINANCIAL,
        status: 'active',
        phone: '1234567890'
    })

    await donor.save()

    const beneficiary = new Beneficiary({ 
      name: 'Test Beneficiary',
      email: 'beneficiary@test.com',
      needs: 'clothing',
      status: BeneficiaryStatus.ACTIVE,
      phone: '1234567890',
      address: '123 Test St'
    })
    
    await beneficiary.save()


    const donation = new Donation({
      donorId: donor._id,
      beneficiaryId: beneficiary._id, 
      amount: 100,
      type: "financial",
      date: new Date(),
      grade: "A",
    })

    await donation.save()
    const savedDonation = await Donation.findById(donation._id)
    
    expect(savedDonation).toBeTruthy()
    expect(savedDonation?.amount).toBe(100)
    expect(savedDonation?.type).toBe("financial")
  })

  it('should list donations by donor', async () => {
    const donor = new Donor({ 
        name: 'Test Donor', 
        email: 'donor@test.com',
        donationType: DonationType.FINANCIAL,
        status: 'active',
        phone: '1234567890'
    })
    const beneficiary = new Beneficiary({ 
      name: 'Test Beneficiary',
      email: 'beneficiary@test.com',
      needs: 'clothing',
      status: BeneficiaryStatus.ACTIVE,
      phone: '1234567890',
      address: '123 Test St'
    })
    await beneficiary.save()

    await donor.save()
    const donation1 = new Donation({
      donorId: donor._id,
      beneficiaryId: beneficiary._id,
      amount: 100,
      type: "financial",
      date: new Date()
    })
    const donation2 = new Donation({
      donorId: donor._id,
      beneficiaryId: beneficiary._id,
      amount: 200,
      type: "financial",
      date: new Date()
    })

    await Promise.all([donation1.save(), donation2.save()])

    const donorDonations = await Donation.find({ donorId: donor._id })
    expect(donorDonations).toHaveLength(2)
  })

  it('should list donations by beneficiary', async () => {
    const beneficiary = new Beneficiary({ 
      name: 'Test Beneficiary', 
      email: 'beneficiary@test.com',
      needs: 'clothing',
      status: BeneficiaryStatus.ACTIVE,
      phone: '1234567890',
      address: '123 Test St'
    })
    await beneficiary.save()

    const donor = new Donor({ 
      name: 'Test Donor', 
      email: 'donor@test.com',
      donationType: DonationType.FINANCIAL,
      status: 'active',
      phone: '1234567890'
    })
    await donor.save()

  
    const donation = new Donation({
      beneficiaryId: beneficiary._id,
      donorId: donor._id,
      amount: 100,
      type: "financial",
      date: new Date()
    })

    await donation.save()

    const beneficiaryDonations = await Donation.find({ beneficiaryId: beneficiary._id })
    expect(beneficiaryDonations).toHaveLength(1)
  })

  it('should get all donations', async () => {
    const donor = new Donor({ 
      name: 'Test Donor', 
      email: 'donor@test.com',
      donationType: DonationType.FINANCIAL,
      status: 'active',
      phone: '1234567890'
    })

    await donor.save()

    const beneficiary = new Beneficiary({ 
      name: 'Test Beneficiary',
      email: 'beneficiary@test.com',
      needs: 'clothing',
      status: BeneficiaryStatus.ACTIVE,
      phone: '1234567890',
      address: '123 Test St'
    })  
    await beneficiary.save()
    
    const donation = new Donation({
      donorId: donor._id,
      beneficiaryId: beneficiary._id,
      amount: 100,
      type: "financial",
      date: new Date(),
      grade: "A",
    })

    await donation.save()
    const donations = await Donation.find()
    expect(donations).toHaveLength(1)
  })
})