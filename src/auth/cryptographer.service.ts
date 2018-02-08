import { pbkdf2Sync, randomBytes } from 'crypto';
import { Component } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common'

@Component()
export class CryptographerService {

  private getHash(password, salt) {
    /** Generate Hash using Password based key derivative function (PBKDF2)*/ 
    return pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  }

  public hashPassword(password) {
    /** Salt is a pseudo-random data buffer contains raw bytes represented in hex*/
    const salt = randomBytes(32).toString('hex'); 
    const hash = this.getHash(password, salt);
    /** Return the salt + hash of the password*/
    return [salt, hash].join('$');
  }
  
  public checkPassword(saltedPasswordHash, candidatePassword) {
    const originalHash = saltedPasswordHash.split('$')[1];
    const salt = saltedPasswordHash.split('$')[0];
    const hash = this.getHash(candidatePassword, salt);
    return (hash === originalHash) ? true : false
  }

}