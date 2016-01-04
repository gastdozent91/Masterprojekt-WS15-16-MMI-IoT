package de.bht.mmi.iot.creator;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Bean;

@EnableScan
public interface UserTableCreator {

    public String createUserTable() throws Exception;

    public String deleteUserTable() throws Exception;
}
